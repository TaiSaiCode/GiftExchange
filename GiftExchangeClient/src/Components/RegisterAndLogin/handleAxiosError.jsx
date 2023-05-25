export default function handleAxiosError(error_request,navigate,session_handler){
    
        if(!error_request)return;
        const STATUS = error_request.status
        if(STATUS==401){
            if(session_handler) session_handler.deleteSession();
            else console.error("ERROR RESPONSE RETURNS 401 BUT HAS NO SESSION HANDLER PROVIDED TO DELETE THE SESSION")
            return;
        }
        if(STATUS==0){
        
            if(navigate) navigate("/network-problem");
            else console.error("ERROR RESPONSE RETURNS 0 BUT HAS NO NAVIGATE FUNCTION FOR RETURNING TO THE NETWORK PROBLEM PAGE")
            return;
        }
    }
    