package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.controller.ProjectController;
import co.edu.ufps.progreagit.controller.ProjectsController;
import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.security.UserPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;
import dataBuilder.ProgreaGitBuilder;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


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
        Assert.assertEquals(projectController.assingMember(userPrincipal,3L).getStatusCode(), HttpStatus.OK);
    }


}
