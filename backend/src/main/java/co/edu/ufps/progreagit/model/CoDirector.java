package co.edu.ufps.progreagit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name="co_director")
public class CoDirector {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCoDirector;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="idProject", nullable=false)
    private Project project;

    @Column(nullable = false)
    @Size(max=100)
    private String name;

    public Integer getIdCoDirector() {
        return idCoDirector;
    }

    public void setIdCoDirector(Integer idCoDirector) {
        this.idCoDirector = idCoDirector;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
