package co.edu.ufps.progreagit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "red_users")
public class RedUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRedUser;

    @ManyToOne
    @JoinColumn(name="idUser", nullable=false)
    private User user;

    @Column(nullable = false)
    @Size(max=100)
    private String address;

    public Long getIdRedUser() {
        return idRedUser;
    }

    public void setIdRedUser(Long idRedUser) {
        this.idRedUser = idRedUser;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}