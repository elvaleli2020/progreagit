package co.edu.ufps.progreagit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProject;

    @Size(max=50)
    private String acronym;

    @Size(max=250)
    private String name;

    @Size(max=255)
    private String abstracts;

    @Size(max=100)
    private String gitAddress;

    @Size(max=100)
    private String cloneGitAddress;

    @Size(max=50)
    private String projectStatus;

    @Size(max=50)
    private String qualification;

    @Size(max=200)
    private String keywords;

    @Size(max=100)
    private String director;

    @Column(updatable = false)
    @CreationTimestamp
    private Date startDate;

    @Column(insertable = true, updatable = false, nullable = true)
    private Date endDate;

    @OneToMany(mappedBy="project")
    @JsonIgnore
    private List<CoDirector> coDirectors;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(	name = "project_user",
            joinColumns = @JoinColumn(name = "id_project"),
            inverseJoinColumns = @JoinColumn(name = "id_user"))
    private List<User> users = new ArrayList<>();

    public Integer getIdProject() {
        return idProject;
    }

    public void setIdProject(Integer idProject) {
        this.idProject = idProject;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbstracts() {
        return abstracts;
    }

    public void setAbstracts(String abstracts) {
        this.abstracts = abstracts;
    }

    public String getGitAddress() {
        return gitAddress;
    }

    public void setGitAddress(String gitAddress) {
        this.gitAddress = gitAddress;
    }

    public String getCloneGitAddress() {
        return cloneGitAddress;
    }

    public void setCloneGitAddress(String cloneGitAddress) {
        this.cloneGitAddress = cloneGitAddress;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<CoDirector> getCoDirectors() {
        return coDirectors;
    }

    public void setCoDirectors(List<CoDirector> coDirectors) {
        this.coDirectors = coDirectors;
    }
}
