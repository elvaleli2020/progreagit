package co.edu.ufps.progreagit.util;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.security.UserPrincipal;

public class ControllerUtil {

    public static void checkCredentiales(UserPrincipal userPrincipal){
        if(userPrincipal==null || userPrincipal.getId()==null)
            throw new NotContentException("Unsupported credentials!");
    }
}
