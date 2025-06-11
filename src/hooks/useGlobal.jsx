import { useOutletContext} from 'react-router-dom';
const useGlobal=()=>{
    const items = useOutletContext()
    return items

}
export default useGlobal;