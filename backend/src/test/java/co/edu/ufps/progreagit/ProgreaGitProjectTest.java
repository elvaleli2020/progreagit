package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.controller.ProjectController;
import co.edu.ufps.progreagit.controller.UserController;
import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchProject;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.security.UserPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;
import dataBuilder.ProgreaGitBuilder;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.opentest4j.AssertionFailedError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class ProgreaGitProjectTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProjectController projectController;

    @Autowired
    private UserController userController;

    private ProgreaGitBuilder progreaGitBuilder;

    public ProgreaGitProjectTest() {
        this.progreaGitBuilder = new ProgreaGitBuilder();
    }


    @Test
    @WithMockUser(roles={"LEADER"})
    @DisplayName(value = "getProject -> See active leader project.")
    public void getProject(){
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
        Assert.assertEquals(projectController.projectBelong(userPrincipal).getStatusCode(), HttpStatus.OK);
    }

    @Test
    @WithMockUser(roles={"LEADER"})
    @DisplayName(value = "getProjectFail -> See active leader project.")
    public void getProjectFail(){
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeaderFail();
        NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
                NotContentException.class,
                () -> projectController.projectBelong(userPrincipal));

        Assert.assertEquals("Unsupported credentials!", thrown.getMessage());
    }

    @Test
    @WithMockUser(roles={"LEADER"})
    @DisplayName(value = "assingMember -> Assign member by leader")
    public void assingMember(){
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
        UserRequest userRequest = new UserRequest();
        userRequest.setId(2L);
        Assert.assertEquals(userController.assingMembersUser(userPrincipal,userRequest).getStatusCode(), HttpStatus.OK);
    }
    @Test
    @WithMockUser(roles = {"LEADER"})
    public void updateProject() throws Exception {
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
        Project project = progreaGitBuilder.getProject();
        ApiResponse apiResponse= (ApiResponse) projectController.updateLeader(userPrincipal, project).getBody();
        assertThat(apiResponse)
                .matches(m->m.getMessage().equals("Project update successfull"));
    }
    @Test
    @WithMockUser(roles = {"LEADER"})
    public void updateProjectFail() throws Exception {
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
        Project project = progreaGitBuilder.getProject();
        project.setIdProject(3);

        AssertionFailedError thrown = org.junit.jupiter.api.Assertions.assertThrows (
                AssertionFailedError.class,
                () -> projectController.updateLeader(userPrincipal, project));
        Assert.assertEquals("Expected org.opentest4j.AssertionFailedError to be thrown, but nothing was thrown.", thrown.getMessage());
    }

    @Test
    @WithMockUser(roles = {"LEADER"})
    public void showMembers() throws Exception {
        UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
        Project project = progreaGitBuilder.getProject();
        Project projects = (Project) projectController.projectBelong(userPrincipal).getBody();
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void showProject() throws Exception {
        SearchProject searchProject = new SearchProject();
        List<Project> projects = (List<Project>) projectController.showAdmin(searchProject).getBody();
    }
    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void showProjectAutor() throws Exception {
        SearchProject searchProject = progreaGitBuilder.searchProjectAutor();
        List<Project> projects = (List<Project>) projectController.showAdmin(searchProject).getBody();
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void showProjectCode() throws Exception {
        SearchProject searchProject = progreaGitBuilder.searchProjectCode();
        List<Project> projects = (List<Project>) projectController.showAdmin(searchProject).getBody();
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void showProjectMentor() throws Exception {
        SearchProject searchProject = progreaGitBuilder.searchProjectMentor();
        List<Project> projects = (List<Project>) projectController.showAdmin(searchProject).getBody();
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void qualification() throws Exception {
        Project project = progreaGitBuilder.generateQualification();
        Project projects = (Project) projectController.updateQualification(project).getBody();
    }
    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void qualificationFailAutentication() throws Exception {
        Project project = progreaGitBuilder.generateQualification();
        project.setIdProject(null);
        NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
                NotContentException.class,
                () -> projectController.updateQualification(project));
        Assert.assertEquals("It has no data to modify", thrown.getMessage());
    }
    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void qualificationFail() throws Exception {
        Project project = progreaGitBuilder.generateQualification();
        project.setQualification(null);
        NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
                NotContentException.class,
                () -> projectController.updateQualification(project));
        Assert.assertEquals("Not update", thrown.getMessage());
    }

    @Test
    public void listProjectGuest() throws Exception {
        SearchProject searchProject = new SearchProject();
        List<Project> projects = (List<Project>) projectController.showGuest(searchProject).getBody();
    }

    @Test
    public void listProjectGuestStudent() throws Exception {
        SearchProject searchProject = progreaGitBuilder.searchProjectAutor();
        List<Project> projects = (List<Project>) projectController.showGuest(searchProject).getBody();
    }

    @Test
    public void listProjectGuestTitulo() throws Exception {
        SearchProject searchProject = new SearchProject();
        List<Project> projects = (List<Project>) projectController.showGuest(searchProject).getBody();
    }

    @Test
    public void listProjectGuestYear() throws Exception {
        SearchProject searchProject = new SearchProject();
        List<Project> projects = (List<Project>) projectController.showGuest(searchProject).getBody();
    }



}
