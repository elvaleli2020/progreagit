package co.edu.ufps.progreagit.service;

import co.edu.ufps.progreagit.exception.BadRequestException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.Roles;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.model.UserNetwork;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.repository.ProjectJPA;
import co.edu.ufps.progreagit.repository.UserJPA;
import co.edu.ufps.progreagit.repository.UserNetworkJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserJPA userJPA;

    @Autowired
    private UserNetworkJPA userNetworkJPA;

    @Autowired
    private ProjectService projectService;

    /**
     * Service get account by id
     * @param id
     * @return
     */
    public User getUser(Long id) {
        /* Checks the existence of the user, if not return an exception */
        return userJPA.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    /**
     * Service to search users
     * @param searchUser
     * @return
     */
    public List<User> searchUser(SearchUser searchUser){
        Roles roles = null;
        List<User> userList= new ArrayList<>();
        User user = null;
        if(searchUser !=null){
            // If the code exist
            if(searchUser.getCode()!=null){
                user = userJPA.findByCode(searchUser.getCode()).orElse(null);
                if(user!=null)
                    userList.add(user);
                return userList;
            }
            // If the email exist
            if(searchUser.getEmail()!=null){

                return userJPA.findByEmailContainingAndIdUserNot(searchUser.getEmail(),1L).orElse( userList);
            }
            // Seach by part of the name
            if(searchUser.getName()!=null){
                return userJPA.findByNameContainingAndIdUserNot(searchUser.getName(), 1L).orElse(userList);
            }
            // Seach by role, admin, leader
            if(searchUser.getRole()!=null){
                if(searchUser.getRole().equals("ADMIN")){
                    roles= new Roles(2);
                }else if(searchUser.getRole().equals("LEADER")){
                    roles= new Roles(3);
                }
                return userJPA.findByRol(roles).orElse(userList);
            }
        }

        return userJPA.findByidUserNot(1L).orElse(userList);
    }

    /**
     * Service by assing leader to a project with restriction of having an active project
     * @param id the user
     * @return boolean
     */
    public boolean assingLeaderUser(Long id){
        /**
         * Checking if you already have a project assigned */
        if(projectService.findByMember(id) != null)
            throw new BadRequestException("Leader already assigned");

        User user = userJPA.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        Roles rol = new Roles(3);
        user.setRol(rol);
        user.setPetitionLeader(false);
        userJPA.save(user);

        Project project = new Project();
        List<User> users = new ArrayList<User>();

        users.add(user);
        project.setUsers(users);

        projectService.register(project);
        return true;
    }

    /**
     * Service
     * @param userRequest
     * @return
     */
    public boolean updateUser(UserRequest userRequest){

        User user = userJPA.findById(userRequest.getId())
                .orElseThrow(null);

        // Exception for not finding the user
        if(user == null)
            throw new BadRequestException("User not fount");

        // Exception for not corresponding the email to the user supplied
        if(user.getEmail().equals(userRequest.getEmail())) {
            throw new BadRequestException("Email address not exist");
        }

        user.setIdUser(userRequest.getId());
        user.setAddress(userRequest.getAddress());
        user.setCellphone(userRequest.getCellphone());
        user.setCode(userRequest.getCode());
        user.setPersonalEmail(userRequest.getPersonalEmail());

        userJPA.save(user);

        List<UserNetwork> userNetworks = new ArrayList<>();
        UserNetwork userNetwork;
        if(userRequest.getUserNetworking()!=null) {
            for (String webAddress : userRequest.getUserNetworking()) {
                userNetwork = new UserNetwork();
                userNetwork.setUser(user);
                userNetwork.setWebAddress(webAddress);
                userNetworkJPA.save(userNetwork);
            }
        }
        return true;
    }

    /**
     * Service list users
     * @return
     */
    public List<User> list(){
        return userJPA.findAll();
    }

    public List<User> listProject() {
        return userJPA.findByProjectsEndDateIsNull();
    }

    public boolean assingMemberUser(Long idLeader, Long idMember) {
        if(projectService.findByMember(idMember) != null)
            throw new BadRequestException("Member already assigned");
        User user = userJPA.findById(idMember)
                .orElseThrow(() -> new ResourceNotFoundException("UserMember", "id", idMember));
        Project project = projectService.findByMember(idMember);
        project.getUsers().add(user);
        projectService.update(project);
        return true;
    }

    public boolean unassingMemberUser(Long idLeader, Long idMember) {
        Project projectMember = projectService.findByMember(idMember);
        if(projectMember != null)
            throw new BadRequestException("Member already assigned");
        User user = userJPA.findById(idMember)
                .orElseThrow(() -> new ResourceNotFoundException("UserMember", "id", idMember));
        Project project = projectService.findByMember(idMember);
        if(projectMember.getIdProject()!=project.getIdProject())
            return false;
        project.getUsers().remove(user);
        projectService.update(project);
        return true;
    }
}
