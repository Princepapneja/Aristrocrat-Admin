


function adminDashCard({icon,title,description,link}) {
  return (
    <div class="w-[400px] py-15   rounded-[20px] shadow-sm   bg-[#F4F4F4] text-center">
       <img src={icon} alt="" className="mx-auto block mb-10"/>
        <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{title}</h5>
        </a>
        <p class="mb-10 font-normal text-gray-500 dark:text-gray-400">{description}</p>
        <a href={link}  className="inline-flex items-center gap-2 px-20 py-2 bg-[#00B290] text-white  text-sm font-medium rounded-[10px] hover:bg-[#00B290]-700 transition">
            Manage
            
        </a>
    </div>
  );
}

export default adminDashCard;
