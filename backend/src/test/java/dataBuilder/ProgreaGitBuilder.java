package dataBuilder;

import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.ERole;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.Roles;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.SearchProject;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.repository.UserJPA;
import co.edu.ufps.progreagit.security.UserPrincipal;
import co.edu.ufps.progreagit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import javax.naming.directory.SearchResult;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ProgreaGitBuilder {


    public UserRequest userRequest(){
        UserRequest userRequest = new UserRequest();
        userRequest.setId(2L);
        userRequest.setCode("1151199");
        userRequest.setAddress("Cll 4 # 5e - 78 Barrio blanco");
        userRequest.setCellphone("3222003339");
        userRequest.setPersonalEmail("eliam_zapata@hotmail.com");
        List<String> userNetworking = new ArrayList<>();
        userNetworking.add("facebook.com/ghhdghdg");
        userNetworking.add("twitter.com/hghdghdgfhf");
        userRequest.setSocialMedia(userNetworking);
        return userRequest;
    }
    public UserRequest userRequestFail(){
        UserRequest userRequest = new UserRequest();
        userRequest.setCode("1151199");
        userRequest.setAddress("Cll 4 # 5e - 78 Barrio blanco");
        userRequest.setCellphone("3222003339");
        userRequest.setPersonalEmail("eliam_zapata@hotmail.com");
        List<String> userNetworking = new ArrayList<>();
        userNetworking.add("facebook.com/ghhdghdg");
        userNetworking.add("twitter.com/hghdghdgfhf");
        userRequest.setSocialMedia(userNetworking);
        return userRequest;
    }

    public UserRequest userRequestAssingLeader() {
        UserRequest userRequest = new UserRequest();
        userRequest.setId(4L);
        return userRequest;
    }

    public UserRequest userRequestAssingLeaderFail() {
        UserRequest userRequest = new UserRequest();
        userRequest.setId(5L);
        userRequest.setCode("1143212");
        return userRequest;
    }

    public UserPrincipal userPrincipalUser() {
        User user = new User();
        user.setIdUser(2L);
        user.setEmail("eliam_zapata@hotmail.com");
        user.setCode("1151193");
        return UserPrincipal.create(user);
    }

    public UserPrincipal userPrincipalUserFail() {
        User user = new User();
        user.setEmail("eliam_zapata@hotmail.com");
        user.setCode("1151193");
        return UserPrincipal.create(user);
    }

    public UserPrincipal userPrincipalUserLeader() {
        User user = new User();
        user.setIdUser(3L);
        user.setEmail("jhorman@ufps.edu.co");
        user.setCode("1151195");
        Roles roles = new Roles();
        roles.setId(3);
        roles.setName(ERole.ROLE_LEADER);
        user.setRol(roles);
        return UserPrincipal.create(user);
    }
    public UserPrincipal userPrincipalUserLeaderFail() {
        User user = new User();
        user.setEmail("jhorman@ufps.edu.co");
        user.setCode("1151195");
        Roles roles = new Roles();
        roles.setId(3);
        roles.setName(ERole.ROLE_LEADER);
        user.setRol(roles);
        return UserPrincipal.create(user);
    }

    public SearchUser searchUserEmpty(){
        return new SearchUser();
    }

    public SearchUser searchUserCode() {
        SearchUser searchUser = new SearchUser();
        searchUser.setCode("1151193");
        return searchUser;
    }

    public SearchUser searchUserEmail() {
        SearchUser searchUser = new SearchUser();
        searchUser.setEmail("@ufps.edu.co");
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return searchUser;
    }

    public SearchUser searchUserName() {
        SearchUser searchUser = new SearchUser();
        searchUser.setEmail("juli");
        return searchUser;
    }

    public Project getProject(){
        Project project = new Project();
        project.setIdProject(1);
        project.setAcronym("Prueba");
        project.setName("Descripción de la prueba");
        project.setKeywords("keyword1,  keyword2, keybord3");
        return project;
    }
    public Project generateQualification(){
        Project project = new Project();
        project.setIdProject(1);
        project.setProjectStatus("aceptada");
        project.setQualification("meritoria");
        return project;
    }

    public SearchProject searchProjectCode(){
        SearchProject searchProject = new SearchProject();
        searchProject.setName("Prueba");
        return searchProject;
    }
    public SearchProject searchProjectAutor(){
        SearchProject searchProject = new SearchProject();
        searchProject.setAutor("Prueba");
        return searchProject;
    }
    public SearchProject searchProjectMentor(){
        SearchProject searchProject = new SearchProject();
        searchProject.setMentor("Prueba");
        return searchProject;
    }


}
