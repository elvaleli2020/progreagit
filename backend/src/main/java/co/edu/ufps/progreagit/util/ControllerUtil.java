package co.edu.ufps.progreagit.util;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.security.UserPrincipal;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;

public class ControllerUtil {

    public static void checkCredentiales(UserPrincipal userPrincipal){
        if(userPrincipal==null || userPrincipal.getId()==null)
            throw new NotContentException("Unsupported credentials!");
    }

    public static String getRolUserPrincipal(UserPrincipal userPrincipal){
        Collection<? extends GrantedAuthority> objectMap=userPrincipal.getAuthorities();
        for(GrantedAuthority grantedAuthority: objectMap){
            return grantedAuthority.getAuthority();
        }
        throw new NotContentException("Unsupported credentials!");
    }
}
