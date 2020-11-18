package co.edu.ufps.progreagit.payload;

import java.util.List;

public class UserRequest {
    private Long id;
    private String Email;
    private String address;
    private String cellphone;
    private String code;
    private String personalEmail;
    private boolean requestLeader;
    private List<String> socialMedia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
    }

    public List<String> getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(List<String> socialMedia) {
        this.socialMedia = socialMedia;
    }

    public boolean isRequestLeader() {
        return requestLeader;
    }

    public void setRequestLeader(boolean requestLeader) {
        this.requestLeader = requestLeader;
    }
}
