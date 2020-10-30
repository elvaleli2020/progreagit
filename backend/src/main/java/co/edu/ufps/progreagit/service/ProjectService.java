package co.edu.ufps.progreagit.service;

import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.repository.ProjectJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectJPA projectJPA;

    @Autowired
    private UserService userService;


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
        if(project.getAbstracts()!=null && project.getAbstracts().equals(project1.getAbstracts())){
            project1.setAbstracts(project.getAbstracts());
        }
        // Name
        if(project.getName().equals(project1.getName())){
            project1.setName(project.getName());
        }
        // Director
        if(project.getDirector()!=null && project.getDirector().equals(project1.getDirector())){
            project1.setDirector(project.getDirector());
        }
        // Acronys
        if(project.getAcronym()!=null && project.getAcronym().equals(project1.getAcronym())){
            project1.setAcronym(project.getAcronym());
        }
        // GitAddresss
        if(project.getGitAddress()!=null && project.getGitAddress().equals(project1.getGitAddress())){
            project1.setGitAddress(project.getGitAddress());
        }
        // keywords
        if(project.getKeywords()!=null && project.getKeywords().equals(project1.getKeywords())){
            project1.setKeywords(project.getKeywords());
        }
        projectJPA.save(project1);
        return true;
    }

    /**
     * Service to search project for its leader
     * @param idUser
     * @return
     */
    public Project findByLeader(Long idUser){
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
        Project project = findByLeader(idUserLeader);
        for(User user:project.getUsers()){
            if(user.getIdUser()==idUserMember){
                return false;
            }
        }
        /**
         * if something turns out wrong it returns an exception of user */
        User userMember = userService.getUser(idUserMember);
        project.getUsers().add(userMember);
        projectJPA.save(project);
        return true;
    }

}