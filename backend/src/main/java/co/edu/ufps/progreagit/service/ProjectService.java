package co.edu.ufps.progreagit.service;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.SearchProject;
import co.edu.ufps.progreagit.repository.ProjectJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectJPA projectJPA;

    @Autowired
    private UserService userService;

    @Autowired
    private GitHubService gitHubService;


    public Project getProject(Integer idProject){
        return projectJPA.findById(idProject)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", idProject));
    }
    /**
     * Service to register a project
     * @param project
     * @return
     */
    public boolean register(Project project){
        if(project.getIdProject() != null)
            throw new NotContentException("Cannot be saved with a project already assigned");
        projectJPA.save(project);
        return true;
    }

    /**
     * Service to update a project
     * @param project
     * @return
     */
    public boolean updateLeader(Project project){
        if(project.getIdProject() == null)
            throw new NotContentException("It has no data to modify");

        Project project1 = this.getProject(project.getIdProject());

        // Abtrapts
        if(project.getAbstracts()!=null && !project.getAbstracts().equals(project1.getAbstracts())){
            project1.setAbstracts(project.getAbstracts());
        }
        // Name
        if(!project.getName().equals(project1.getName())){
            project1.setName(project.getName());
        }
        // Director
        if(project.getDirector()!=null && !project.getDirector().equals(project1.getDirector())){
            project1.setDirector(project.getDirector());
        }
        // Acronys
        if(project.getAcronym()!=null && !project.getAcronym().equals(project1.getAcronym())){
            project1.setAcronym(project.getAcronym());
        }
        // GitAddresss
        if(project.getGitAddress()!=null && !project.getGitAddress().equals(project1.getGitAddress())){
            project1.setGitAddress(project.getGitAddress());
        }
        // keywords
        if(project.getKeywords()!=null && !project.getKeywords().equals(project1.getKeywords())){
            project1.setKeywords(project.getKeywords());
        }
        update(project1);
        return true;
    }

    /**
     * Service to search project for its member or leader
     * @param idUser
     * @return
     */
    public Project findByMember(Long idUser){
        /**
         * Check the existence of the project, otherwise you return an exception
         * */
        Project project= projectJPA.findByUsersIdUserAndEndDateIsNull(idUser)
                .orElse(null);
        return project;
    }

    /**
     * Service to assign member
     * @param idUserLeader
     * @param idUserMember
     * @return boolean
     */
    public boolean assingMember(Long idUserLeader, Long idUserMember) {
        /**
         * if something turns out wrong it returns an exception of project */
        Project project = findByMember(idUserLeader);
        if(project.getUsers()==null)
            throw new NotContentException("No");
        for(User user:project.getUsers()){
            if(user.getIdUser()==idUserMember){
                return false;
            }
        }
        /**
         * if something turns out wrong it returns an exception of user */
        User userMember = userService.getUser(idUserMember);
        project.getUsers().add(userMember);
        update(project);
        return true;
    }

    public List<Project> showProject(SearchProject searchProject) {
        List<Project> projects= null;
        if(searchProject!=null){
            /*  find acronym and name */
            if(searchProject.getName()!=null ){
                if(searchProject.getEstado()!=null && searchProject.getQualification()!=null)
                    return projectJPA.findByNameAndStateAndQualification(
                            searchProject.getName(),
                            searchProject.getEstado(),
                            searchProject.getQualification());
                if(searchProject.getEstado()!=null) {
                    return projectJPA.findByNameAndState(
                            searchProject.getName(),
                            searchProject.getEstado());
                }
                return projectJPA.findByName(searchProject.getName()).orElse(null);
            }

            if(searchProject.getKeywords()!=null){
                if(searchProject.getEstado()!=null && searchProject.getQualification()!=null)
                    return projectJPA.findByKeywordAndStateAndQualification(
                            searchProject.getKeywords(),
                            searchProject.getEstado(),
                            searchProject.getQualification());
                if(searchProject.getEstado()!=null) {
                    return projectJPA.findByKeywordAndState(
                            searchProject.getKeywords(),
                            searchProject.getEstado());
                }
                return projectJPA.findByKeyword(searchProject.getKeywords());
            }

            if(searchProject.getAutor()!=null){
                if(searchProject.getEstado()!=null && searchProject.getQualification()!=null)
                    return projectJPA.findByAutorAndStateAndQualification(
                            searchProject.getAutor(),
                            searchProject.getEstado(),
                            searchProject.getQualification());
                if(searchProject.getEstado()!=null) {
                    return projectJPA.findByAutorAndState(
                            searchProject.getAutor(),
                            searchProject.getEstado());
                }
                return projectJPA.findByAutor(searchProject.getAutor());
            }
            if(searchProject.getMentor()!=null){
                if(searchProject.getEstado()!=null && searchProject.getQualification()!=null)
                    return projectJPA.findByMentorAndStateAndQualification(
                            searchProject.getMentor(),
                            searchProject.getEstado(),
                            searchProject.getQualification());
                if(searchProject.getEstado()!=null) {
                    return projectJPA.findByMentorAndState(
                            searchProject.getMentor(),
                            searchProject.getEstado());
                }
                return projectJPA.findByAutor(searchProject.getAutor());
            }
        }
        return projectJPA.findAll();
    }

    /**
     * Method
     * HU5 RF13
     * @param project
     * @return
     */
    public Project updateQualification(Project project) {
        if(project.getIdProject() == null)
            throw new NotContentException("It has no data to modify");
        Project project1 = this.getProject(project.getIdProject());

        //Project's state ACEPTADO
        if(project.getQualification()!=null && project.getProjectStatus()!=null){
            project1.setProjectStatus(project.getProjectStatus());
            project1.setQualification(project.getQualification());
            project1.setEndDate(project1.getStartDate());
            System.out.println(project1);

            // SE CLONA EL PROYECTO
            project1.setCloneGitAddress(
                    cloneRepository(
                            project1.getIdProject(),
                            project1.getAcronym(),
                            project1.getGitAddress()));

            update(project1);

            return this.getProject(project.getIdProject());
        }
        throw new NotContentException("Not update");
    }

    public Project update(Project project){
        return projectJPA.save(project);
    }

    /**
     * service
     * @param searchProject
     * @return
     */
    public List<Project> showProjectGuest(SearchProject searchProject) {
        if(searchProject!=null){
            if(searchProject.getName()!=null&&searchProject.getName()!="")
                return projectJPA.findByTitle(searchProject.getName());
            if(searchProject.getStudent()!=null&&searchProject.getStudent()!="")
                return projectJPA.findbyEstudiante(searchProject.getStudent());
        }
        return projectJPA.findByInvidado();
    }

    /**
     * Service, Clone repository
     * HU05 RF14, The system must allow the administrator user to clone the GitHub
     * repository for the Systems engineering program workspace
     * @param idProject
     * @return
     */
    public String cloneRepository(int idProject, String name, String dir){
        return gitHubService.createGitClone(name.toLowerCase() + "-" + idProject , dir);
    }
}
