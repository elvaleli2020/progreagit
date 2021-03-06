package co.edu.ufps.progreagit.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @Column(nullable = false)
    @Size(max=100)
    private String name;

    @Size(max=12)
    private String code;

    @Email
    @Column(nullable = false)
    @Size(max=100)
    private String email;

    @Email
    @Size(max=100)
    private String personalEmail;

    @Size(max=200)
    private String address;

    private String cellphone;

    @Column(columnDefinition = "boolean default false", nullable = true)
    private boolean petitionLeader;

    @ManyToOne
    @JoinColumn(name="idRol", nullable=true)
    private Roles rol;

    @OneToMany(mappedBy="user")
    private List<UserNetwork> userNetworks;

    private String imageUrl;

    @Column(nullable = false)
    @JsonIgnore
    private Boolean emailVerified = false;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private AuthProvider provider;

    @JsonIgnore
    private String providerId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(	name = "project_user",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_project"))
    @JsonIgnore
    private List<Project> projects = new ArrayList<>();

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
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

    public List<UserNetwork> getUserNetworks() {
        return userNetworks;
    }

    public void setUserNetworks(List<UserNetwork> userNetworks) {
        this.userNetworks = userNetworks;
    }

    public Roles getRol() {
        return rol;
    }

    public void setRol(Roles rol) {
        this.rol = rol;
    }

    public boolean isPetitionLeader() {
        return petitionLeader;
    }

    public void setPetitionLeader(boolean petitionLeader) {
        this.petitionLeader = petitionLeader;
    }
}
