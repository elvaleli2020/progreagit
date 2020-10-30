package co.edu.ufps.progreagit.payload;

import co.edu.ufps.progreagit.model.ERole;

public class SearchUser {
    String name;
    String code;
    String email;
    String rol;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
