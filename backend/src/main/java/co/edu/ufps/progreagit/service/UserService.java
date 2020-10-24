package co.edu.ufps.progreagit.service;

import co.edu.ufps.progreagit.exception.BadRequestException;
import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Roles;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.model.UserNetwork;
import co.edu.ufps.progreagit.payload.SeachUser;
import co.edu.ufps.progreagit.payload.UserRequest;
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

    /**
     * Service get account by id
     * @param id
     * @return
     */
    public User accountUser(Long id) {
        return userJPA.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    /**
     * Service to seach users
     * @param seachUser
     * @return
     */
    public List<User> seachUser(SeachUser seachUser){
        Roles roles = null;
        List<User> userList= new ArrayList<>();
        User user = null;
        if(seachUser!=null){
            // If the code exist
            if(seachUser.getCode()!=null){
                user = userJPA.findByCode(seachUser.getCode()).orElse(null);
                if(user!=null)
                    userList.add(user);
                return userList;
            }
            // If the email exist
            if(seachUser.getEmail()!=null){

                return userJPA.findByEmailContainingAndIdUserNot(seachUser.getEmail(),1L).orElse( userList);
            }
            // Seach by part of the name
            if(seachUser.getName()!=null){
                return userJPA.findByNameContainingAndIdUserNot(seachUser.getName(), 1L).orElse(userList);
            }
            // Seach by role, admin, leader
            if(seachUser.getRole()!=null){
                if(seachUser.getRole().equals("ADMIN")){
                    roles= new Roles(2);
                }else if(seachUser.getRole().equals("LEADER")){
                    roles= new Roles(3);
                }
                return userJPA.findByRol(roles).orElse(userList);
            }
        }

        return userJPA.findByidUserNot(1L).orElse(userList);
    }

    /**
     * Service by assing leader to a project
     * @param id the user
     * @return boolean
     */
    public boolean assingLeaderUser(Long id){
        User user = userJPA.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setRoles(null);
        Roles rol = new Roles(3);
        user.setRol(rol);
        userJPA.save(user);
        return true;
    }

    /**
     * Service
     * @param userRequest
     * @return
     */
    public boolean updateUser(UserRequest userRequest){

        User user = userJPA.findById(userRequest.getId())
                .orElse(null);

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
}
