package co.edu.ufps.progreagit.payload;

import co.edu.ufps.progreagit.model.ERole;

public class SearchUser {
    private String name;
    private String code;
    private String email;
    private String rol;
    private String petitionLeader;

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

    public String getRol() {
        return rol;
    }

    public String getPetitionLeader() {
        return petitionLeader;
    }

    public void setPetitionLeader(String petitionLeader) {
        this.petitionLeader = petitionLeader;
    }
}
