function useDebaunce(cd , delay = 2000){
       let timerId;
       return(...args)=>{
        console.log(...args);
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
          cd(...args);
        },delay)
       }
}

export default useDebaunce;