package co.edu.ufps.progreagit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user_network")
public class UserNetwork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUserNetwork;

    @ManyToOne
    @JoinColumn(name="idUser", nullable=false)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    @Size(max=100)
    private String webAddress;

    public Long getIdUserNetwork() {
        return idUserNetwork;
    }

    public void setIdUserNetwork(Long idUserNetwork) {
        this.idUserNetwork = idUserNetwork;
    }

    public String getWebAddress() {
        return webAddress;
    }

    public void setWebAddress(String webAddress) {
        this.webAddress = webAddress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}