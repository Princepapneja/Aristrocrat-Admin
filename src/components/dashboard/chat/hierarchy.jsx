// src/components/ZoomPanComponent.jsx
import { Minus, Plus, PlusCircle, Save, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import useGlobal from '../../../hooks/useGlobal';
import Buttons from '../../utils/buttons';
import Card from '../../utils/card';
import Modal from '../../utils/Modal';
import apiHandler from '../../../functions/apiHandler';

const Hierarchy = () => {
  const containerRef = useRef(null);
  const firstQuestionRef = useRef(null);
  const [questions, setQuestions] = useState([])
  const [firstQuestion, setFirstQuestion] = useState(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const { success, error, setRender, render } = useGlobal();
  const [disable, setDisable] = useState(false);
  const [initialDistance, setInitialDistance] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 })

  const handleWheel = (e) => {
    e.preventDefault();
    const scaleAmount = 0.1;
    const newScale = e.deltaY < 0 ? scale + scaleAmount : scale - scaleAmount;
    setScale(Math.max(newScale, 0.1));
  };

  const handleMouseDown = (e) => {
    e.stopPropagation()
    setIsPanning(true);
    setOrigin({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isPanning) return;
    setTranslate({ x: e.clientX - origin.x, y: e.clientY - origin.y });
  };

  const handleMouseUp = (e) => {
    e.stopPropagation(),

      setIsPanning(false);
  };

  useEffect(() => {
    fetchData()
  }, [render]);
  useEffect(() => {
    const primaryQuestion = questions.find((q) => q?.primary);
    setFirstQuestion(primaryQuestion);
  }, [questions])
  const fetchData = async (skip, count, order, orderBy, search) => {
    try {
      let url = `question?skip=${skip}&count=${count}`;
      if (search) {
        url += url.includes('?') ? `&search=${search}` : `?search=${search}`;
      }
      const response = await apiHandler.get(url);
      const data = response?.data?.data || {};
      setQuestions(data.resp)
      const primaryQuestion = data.resp.find((q) => q?.primary);
      setFirstQuestion(primaryQuestion);
    } catch (err) {
      console.error(`Failed to fetch data: ${err.message}`);
    }
  };
  const handleEditChange = (e, index, flag = false) => {
    setDisable(true)
    const ques = [...questions];
    if (flag) {
      const idx = ques.findIndex((q) => (q._id || q.tempId) === index);
      if (idx !== -1) {
        ques[idx] = { ...ques[idx], question: e.target.value };
      }
    } else {
      ques[index] = { ...ques[index], question: e.target.value };
    }

    setQuestions(ques);
  };

  const handleOptionChange = (e, qIndex, index) => {
    setDisable(true)
    const ques = [...questions]
    if (qIndex === 0) {
      ques[qIndex].options[index].text = e.target.value

    } else {
      ques.find((q) => (q._id || q.tempId) === qIndex).options[index].text = e.target.value
    }
    setQuestions(ques)
  };

  const handleEditSave = async (questionId) => {
    if (!disable) return
    let editedQues = questions?.find((e) => e._id === questionId);

    const updatedQuestions = [...questions];
    try {
      const { data } = await apiHandler.patch(`question/${questionId}`, {
        question: editedQues?.question,
        options: editedQues?.options
      });
      success(data.message);
      setRender(!render)
      setQuestions(updatedQuestions);
      setDisable(false)
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleDeleteClick = async (questionId) => {
    let ques = [...questions];

    if (questionId === 0) {
      ques.pop();
    }

    else {
      const currentQuestion = ques.find((q) => (q?._id || q?.tempId) === questionId);
      const nextNodePresent = currentQuestion.options.some((option) => option.nextQuestion || option.nextQuestionTemp);

      if (nextNodePresent) {
        error("Please delete child node first");
        return;
      }

      const previousQuestion = ques.find((q) =>
        q.options.some((w) => w.nextQuestion === questionId || w.nextQuestionTemp === questionId)
      );

      previousQuestion?.options?.forEach((option) => {
        if (option.nextQuestion === questionId) {
          option.nextQuestion = "";
        }
        if (option.nextQuestionTemp === questionId) {
          option.nextQuestionTemp = "";
        }
      });

      ques = ques.filter((q) => (q?._id || q?.tempId) !== questionId);

      if (currentQuestion?._id) {
        await apiHandler.delete(`/delete-entry/question/${currentQuestion?._id}`)
        if (questionId !== 0) {
          await apiHandler.patch(`/question/${previousQuestion._id}`, { options: previousQuestion.options });
          setRender(!render)

        }

      }
      success("Question deleted succesfully")
    }

    setQuestions(ques);
    setDisable(false)
  };





  const addOption = (index = 0, flag = false) => {

    const newQuestion = [...questions]
    if (flag) {
      newQuestion?.find((e) => (e._id || e.tempId) === index).options.push({
        text: "",
        nextQuestion: ""
      })
    } else {
      newQuestion[index].options.push({
        text: "",
        nextQuestion: ""
      })
    }

    setQuestions(newQuestion)
  };

  const handleAddQuestion = async (index, flag = false) => {
    let newQuestion = {};
    let idx;

    if (flag) {
      idx = questions.findIndex((q) => (q._id || q.tempId) === index);

      newQuestion = {
        question: questions?.[idx]?.question,
        options: questions?.[idx]?.options,
        primary: false,
      };
    } else {
      newQuestion = {
        question: questions?.[index]?.question,
        options: questions?.[index]?.options,
        primary: true,
      };
    }

    try {
      const response = await apiHandler.post('/question', newQuestion);
      success(response.data.message);
      const newQuestionId = response.data.data._id;

      if (flag) {
        const updatedQuestions = questions.map((question) => {
          const updatedOptions = question.options.map((option) => {
            if (option.nextQuestionTemp === index) {
              return { ...option, nextQuestion: newQuestionId };
            }
            return option;
          });

          return { ...question, options: updatedOptions };
        });

        const questionToUpdate = updatedQuestions.find(q =>
          q.options.some(opt => opt.nextQuestion === newQuestionId)
        );

        if (questionToUpdate) {
          await apiHandler.patch(`/question/${questionToUpdate._id}`, { options: questionToUpdate.options });
        }

        setQuestions(updatedQuestions);


      }
      setRender(!render)
      setDisable(false)

    } catch (err) {
      error(err?.message || 'An error occurred');
    }
  };


  const handleNextQues = async (qIndex, index) => {
    if (disable) {
      error("Please save the current question ")
      return
    }
    setDisable(true)
    const ques = [...questions];
    const unique = Date.now()

    let currentQues
    if (qIndex === 0) {
      currentQues = questions?.[qIndex]
    } else {
      currentQues = ques.find(q => (q._id || q.tempId) === qIndex)

    }

    ques.push(
      {
        tempId: unique,
        question: "",
        options: [
          {
            text: "",
            nextQuestion: "",
            nextQuestionTemp: ""

          },
          {
            text: "",
            nextQuestion: "",
            nextQuestionTemp: ""

          }
        ],
        primary: false // Set primary based on the condition
      }
    );
    currentQues.options[index]['nextQuestionTemp'] = unique;




    setQuestions(ques);

  };

  const handleOptionDelete = async (index, qIndex) => {
    try {
      const updatedQuestions = [...questions];

      // Find the question by index or ID
      const question = qIndex === 0
        ? updatedQuestions[qIndex]
        : updatedQuestions.find(q => (q._id || q.tempId) === qIndex);
      const questionIndex = qIndex === 0
        ? qIndex
        : updatedQuestions.findIndex(q => (q._id || q.tempId) === qIndex);

      if (!question || question.options.length <= 1 || !question.options[index]) {
        error("The question needs at least one option");
        return;
      }

      const optionToDelete = question.options[index];
      if (optionToDelete.nextQuestion || optionToDelete.nextQuestionTemp) {
        error("Please remove the child node first");
        return;
      }

      question.options = question.options.filter((_, i) => i !== index);

      updatedQuestions[questionIndex] = { ...question, options: question.options };

      if (question._id) {
        await apiHandler.patch(`question/${question._id}`, { options: question.options });
      }

      setQuestions(updatedQuestions);
      success("Option deleted successfully");
      setRender(!render);
    } catch (err) {
      console.error("Error updating question:", err);
      error("An error occurred while deleting the option");
    }
  };


  const convertToTreeNode = (question) => {
    if (!question) return null;
    return (
      <TreeNode
        key={question._id}
        label={
          <div className="flex justify-between items-end text-white  bg-[#89579b] rounded-lg max-w-96 w-full m-auto">
            {
              question?.isEditing ?
                <input
                  className="w-72 outline-none   p-2 bg-transparent text-center"
                  value={question.question}
                  autoFocus
                  onChange={(e) => { handleEditChange(e, question?._id || question?.tempId, true) }}
                  onBlur={() => { handleBlur(false, question?._id || question?.tempId, true) }}
                />
                :
                <p
                  className="w-72 outline-none   p-2 bg-transparent text-center"
                  onClick={() => { handleBlur(true, question?._id || question?.tempId, true) }}
                >
                  {
                    question?.question
                  }
                </p>

            }
            <div className="flex gap-2 p-2  ">
              <span title="Save" className="cursor-pointer">
                <Save onClick={() => {
                  question?._id ?
                    handleEditSave(question?._id)
                    :

                    handleAddQuestion(question?._id || question?.tempId, true)
                }}
                />
              </span>
              <span title="Delete" className="cursor-pointer">
                <Trash onClick={() => {
                  handleDeleteClick(question?._id || question?.tempId)
                }} className=" cursor-pointer" />
              </span>
              {/* <DeleteData properties={question} type={"question"} /> */}
              <span title="Add option" className="cursor-pointer">
                <PlusCircle className='D' onClick={
                  () => { addOption(question?._id || question?.tempId, true) }
                } />
              </span>
            </div>
          </div>
        }
      >
        {question.options?.map((e, i) => (
          <TreeNode
            key={i}
            label={
              <div className="flex gap-4  justify-between items-center bg-background rounded-lg max-w-96 w-full m-auto">

                {
                  e?.isEditing ?
                    <input className="w-72 p-2 bg-transparent text-primary text-center" onChange={(e) => handleOptionChange(e, (question?._id || question?.tempId), i)} value={e.text}
                      autoFocus

                      onBlur={() => { handleBlurOption(false, question?._id || question?.tempId, i, true) }}

                    >
                    </input>
                    :
                    <p onClick={() => { handleBlurOption(true, question?._id || question?.tempId, i, true) }} className="w-72  p-2 bg-transparent text-primary text-center" >{e?.text}</p>

                }
                <div className="flex gap-2  p-2">
                  {/* <Save className="text-green-600 cursor-pointer" onClick={() => {

                          firstQuestion?._id ?
                            handleEditSave(firstQuestion?._id)
                            :

                            handleAddQuestion(0)
                        }} */}
                  {/* /> */}

                  <span title="Delete">
                    <Trash onClick={() => {
                      handleOptionDelete(i, question?._id || question?.tempId, true)
                    }} className="text-red-400 cursor-pointer" />
                  </span>
                  {
                    !(e?.nextQuestion || e?.nextQuestionTemp) &&
                    <span title="Add question">
                      <PlusCircle className="text-blue-500 cursor-pointer" onClick={() => { handleNextQues(question?.tempId || question?._id, i) }} />
                    </span>
                  }
                </div>
              </div>

            }
          >
            {convertToTreeNode(questions.find((q) => (q._id || q.tempId) === (e.nextQuestion || e.nextQuestionTemp)))}
          </TreeNode>
        ))}

      </TreeNode>
    );
  };
  const handlePrimaryQuestion = () => {

    setQuestions(

      [
        {
          question: "",
          options: [
            {
              text: "",
              nextQuestion: ""
            },
            {
              text: "",
              nextQuestion: ""
            }
          ],
          primary: true // Set primary based on the condition
        }
      ]
    );
  };

  const handleBlur = (option, index, flag = false) => {
    const updatedQuestions = [...questions];
    if (flag) {
      updatedQuestions.find((q) => (q._id || q.tempId) === index).isEditing = option
    } else {

      updatedQuestions[index].isEditing = option;
    }
    setQuestions(updatedQuestions);
  };
  const handleBlurOption = (option, qIndex, index, flag = false) => {
    const updatedQuestions = [...questions];
    if (flag) {
      updatedQuestions.find((q) => (q._id || q.tempId) === qIndex).options[index].isEditing = option

    } else {

      updatedQuestions[qIndex].options[index].isEditing = option;
    }
    setQuestions(updatedQuestions);
  };
  const handleReset = async () => {
    try {
      const { data } = await apiHandler.delete("/questions")
      success(data.message)
      setRender(!render)

    } catch (err) {
      error(err.message)
    }
  }

  // mobile view functionality
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDist = Math.sqrt(
        (touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2
      );
      setInitialDistance(initialDist);
      setTouchStartPosition({
        x: (touch1.pageX + touch2.pageX) / 2,
        y: (touch1.pageY + touch2.pageY) / 2
      });
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      setOrigin({ x: touch.pageX - translate.x, y: touch.pageY - translate.y });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDist = Math.sqrt(
        (touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2
      );
      const scaleAmount = newDist / initialDistance;
      setScale(scale * scaleAmount);
      setInitialDistance(newDist);
    } else if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      setTranslate({ x: touch.pageX - origin.x, y: touch.pageY - origin.y });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setIsPanning(false);
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [scale, translate, isPanning]);
  const handleZoomIn = () => {
    setScale(prevScale => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.1));
  };
  return (
    <Card title={"Hierarchical View"}>

      <div className='flex gap-4 justify-between'>

        {questions?.length === 0 ?
          <Buttons onClick={handlePrimaryQuestion}>
            Add Primary question
          </Buttons>
          :
          <Modal openCTA={<Buttons>Reset</Buttons>} firstCtaText={"Cancel"} secondCtaText={"Reset"} handleSecondCta={handleReset} className={`grid place-items-center md:!max-w-[unset] !w-[unset]`}>



            <p className="normal-case text-lg text-center font-bold max-w-80">Are you sure you want to reset all the questions?</p>

          </Modal>
        }
        <div className='flex gap-1'>

        <Buttons className={"px-1.5"} spinner={false} onClick={handleZoomIn}>
          <Plus />

        </Buttons>
        <Buttons type='border' spinner={false} className={"px-1.5"}  onClick={handleZoomOut}>
          <Minus />

        </Buttons>
        </div>

      </div>

      <div className={`bg-white  ${isPanning ? "cursor-grabbing" : "cursor-grab"}  h-[calc(100vh-210px)] overflow-hidden`}>


        <div
          ref={containerRef}
          className="relative w-full h-[calc(100vh-210px)] bg-white touch-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div
            className="absolute w-full p-2 bg-white"
            style={{
              transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
              transformOrigin: '0 0',
            }}
          >
            {questions?.length > 0 && (
              <Tree
                label={
                  <div ref={firstQuestionRef} className="flex items-center justify-between text-white bg-primary rounded-lg max-w-96 w-full m-auto">
                    {firstQuestion?.isEditing ?
                      <input
                        className="w-72 outline-none   p-2 bg-transparent text-center"
                        autoFocus
                        value={firstQuestion?.question || questions?.[0]?.question}
                        onChange={(e) => { handleEditChange(e, 0) }}
                        onBlur={() => { handleBlur(false, 0) }}
                      />
                      :
                      <p className="w-full outline-none   p-2 bg-transparent text-center" onClick={() => handleBlur(true, 0)}>{firstQuestion?.question}</p>}
                    <div className="flex gap-2 p-2  rounded-lg">
                      <span title="Save" className="cursor-pointer">
                        <Save onClick={() => {
                          firstQuestion?._id ?
                            handleEditSave(firstQuestion?._id)
                            :

                            handleAddQuestion(0)
                        }}
                        />
                      </span>
                      <span title="Delete" className="cursor-pointer">
                        <Trash onClick={() => {
                          handleDeleteClick(firstQuestion?._id || firstQuestion?.tempId)
                        }} />
                      </span>
                      <span title="Add option" className="cursor-pointer">
                        <PlusCircle onClick={
                          () => { addOption(0) }
                        } />
                      </span>

                    </div>
                  </div>
                }
              >
                {firstQuestion?.options?.map((option, i) => (
                  <TreeNode
                    key={i}
                    label={
                      <div className="flex gap-4 justify-between items-center bg-background rounded-lg max-w-96 w-full m-auto">
                        {
                          option?.isEditing ?
                            <input className="w-72 p-2 bg-transparent text-primary text-center" onChange={(e) => handleOptionChange(e, 0, i)} value={option?.text}
                              autoFocus

                              onBlur={() => handleBlurOption(false, 0, i)}
                            >
                            </input>
                            :
                            <p onClick={() => handleBlurOption(true, 0, i)} className="w-72 p-2 bg-transparent text-primary text-center" >{option?.text}</p>
                        }
                        <div className="flex gap-2 rounded-lg p-2 ">

                          <span title="Delete">
                            <Trash onClick={() => {
                              handleOptionDelete(i, 0)
                            }} className="text-red-400 cursor-pointer" />
                          </span>
                          {
                            !(option?.nextQuestion || option?.nextQuestionTemp) &&
                            <span>
                              <PlusCircle className="text-blue-500 cursor-pointer" onClick={() => { handleNextQues(0, i) }} />
                            </span>
                          }
                        </div>
                      </div>
                    }
                  >
                    {(option?.nextQuestion || option.nextQuestionTemp) && Object.keys(questions).length > 0 && convertToTreeNode(questions?.find((q) => (q._id || q.tempId) === (option.nextQuestion || option.nextQuestionTemp)))}
                  </TreeNode>
                ))}
              </Tree>
            )}
          </div>
        </div>
      </div>
    </Card>

  );
};

export default Hierarchy;
