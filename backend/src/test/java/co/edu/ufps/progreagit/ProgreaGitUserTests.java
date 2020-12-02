package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.controller.ProjectController;
import co.edu.ufps.progreagit.controller.UserController;
import co.edu.ufps.progreagit.exception.BadRequestException;
import co.edu.ufps.progreagit.exception.NotContentException;
import co.edu.ufps.progreagit.exception.ResourceNotFoundException;
import co.edu.ufps.progreagit.model.Project;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class ProgreaGitUserTests {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	private ProgreaGitBuilder progreaGitBuilder;

	@Autowired
	private UserController userController;

	public ProgreaGitUserTests() {
		this.progreaGitBuilder = new ProgreaGitBuilder();
	}

	//////////// ITERATION 1 /////////////

	@Test
	@WithMockUser(roles={"USER","ADMIN", "LEADER"})
	@DisplayName(value = "getAccountUser -> The admin and leader user can access to visualize a specific user.")
	public void getAccountUser() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUser();
		User user= (User) userController.getAccountUserLogin(userPrincipal).getBody();
		assertThat(user)
				.matches(m->m.getIdUser().equals(userPrincipal.getId()));
	}

	@Test
	@WithMockUser(roles={"USER","ADMIN", "LEADER"})
	@DisplayName(value = "getAccountUser -> The admin and leader user can access to visualize a specific user.")
	public void getAccountUserFail() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserFail();

		NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
				NotContentException.class,
				() -> userController.getAccountUserLogin(userPrincipal));

		Assert.assertEquals("Unsupported credentials!", thrown.getMessage());
	}

	@Test
	@WithMockUser(roles={"LEADER","ADMIN"})
	@DisplayName(value = "getListUser -> List of registered users regardless of their role, discriminating against administrator users.")
	public void getListUser() throws Exception {
		mvc.perform(MockMvcRequestBuilders
				.get("/user/")
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles={"ADMIN", "LEADER"})
	@DisplayName(value = "searchUser -> List of users filtered by code, if they have a leader request or not")
	public void searchUser() throws Exception {
		// Search by code
		SearchUser searchUser = progreaGitBuilder.searchUserEmpty();
		UserPrincipal userPrincipal = progreaGitBuilder.userPrincipalUser();
		List<User> users= (List<User>) userController.searchUser(searchUser, userPrincipal).getBody();
	}

	@Test
	@WithMockUser(roles={"ADMIN", "LEADER"})
	@DisplayName(value = "searchUser -> List of users filtered by code, if they have a leader request or not")
	public void searchUserByCode() throws Exception {
		// Search by code
		SearchUser searchUser = progreaGitBuilder.searchUserCode();
		UserPrincipal userPrincipal = progreaGitBuilder.userPrincipalUser();
		List<User> users= (List<User>) userController.searchUser(searchUser, userPrincipal).getBody();
	}

	@Test
	@WithMockUser(roles={"ADMIN", "LEADER"})
	@DisplayName(value = "searchUser -> List of users filtered by email if they have a leader request or not")
	public void searchUserByEmail() throws Exception {
		// Search by parts of the email
		SearchUser searchUser = progreaGitBuilder.searchUserEmail();
		UserPrincipal userPrincipal = progreaGitBuilder.userPrincipalUser();
		List<User> users= (List<User>) userController.searchUser(searchUser, userPrincipal).getBody();
	}

	@Test
	@WithMockUser(roles={"ADMIN", "LEADER"})
	@DisplayName(value = "searchUser -> List of users filtered by name, if they have a leader request or not")
	public void searchUserByName() throws Exception {
		// Search by parts of the name
		SearchUser searchUser = progreaGitBuilder.searchUserName();
		UserPrincipal userPrincipal = progreaGitBuilder.userPrincipalUser();
		List<User> users= (List<User>) userController.searchUser(searchUser, userPrincipal).getBody();
	}

	@Test
	@WithMockUser(roles={"USER","ADMIN", "LEADER"})
	@DisplayName(value = "getAccountUser -> The admin and leader user can access to visualize a specific user.")
	public void searchUserFail() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserFail();

		NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
				NotContentException.class,
				() -> userController.getAccountUserLogin(userPrincipal));

		Assert.assertEquals("Unsupported credentials!", thrown.getMessage());
	}

	@Test
	@WithMockUser(roles={"USER"})
	@DisplayName(value = "updateUser -> The user as soon as he accesses the authenticator if he is missing data")
	public void updateUser() throws Exception {
		UserRequest userRequest = progreaGitBuilder.userRequest();
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUser();
		ApiResponse apiResponse= (ApiResponse) userController.updateUser(userRequest, userPrincipal).getBody();
		assertThat(apiResponse)
				.matches(m->m.getMessage().equals("User update successfull"));
	}

	@Test
	@WithMockUser(roles={"USER"})
	@DisplayName(value = "updateUserFail -> The user as soon as he accesses the authenticator if he is missing data")
	public void updateUserFail() throws Exception {
		UserRequest userRequest = null;
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUser();

		NotContentException thrown = org.junit.jupiter.api.Assertions.assertThrows (
				NotContentException.class,
				() -> userController.updateUser(userRequest, userPrincipal));
		Assert.assertEquals("You need additional data!", thrown.getMessage());
	}


	@Test
	@WithMockUser(roles={"ADMIN"})
	@DisplayName(value = "assingLeader -> List of users filtered by code, email, name, if they have a leader request or not")
	public void assingLeader() throws  Exception {
		UserRequest userRequest = progreaGitBuilder.userRequestAssingLeader();
		mvc.perform(MockMvcRequestBuilders
				.post("/user/assing_leader")
				.content(objectMapper.writeValueAsString(userRequest))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles={"ADMIN"})
	@DisplayName(value = "assingLeader -> List of users filtered by code, email, name, if they have a leader request or not")
	public void assingLeaderFail() throws  Exception {
		UserRequest userRequest = progreaGitBuilder.userRequestAssingLeaderFail();
		userRequest.setId(null);

		RuntimeException thrown = org.junit.jupiter.api.Assertions.assertThrows (
				RuntimeException.class,
				() -> userController.assingLeaderUser(userRequest));
		Assert.assertEquals("You need additional data", thrown.getMessage());
	}


	//////// ITERATION 2 ////////////////

	@Test
	@WithMockUser(roles = {"LEADER"})
	public void asisingMembrer() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();

		UserRequest userRequest = progreaGitBuilder.userRequest();
		userRequest.setId(5L);
		Boolean cond = (Boolean) userController.assingMembersUser(userPrincipal,userRequest).getBody();
		assertThat(cond)
				.matches(m->m=true);

	}
	@Test
	@WithMockUser(roles = {"LEADER"})
	public void asisingMembrerFail() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();

		UserRequest userRequest = progreaGitBuilder.userRequest();
		userRequest.setId(4L);
		BadRequestException thrown = org.junit.jupiter.api.Assertions.assertThrows (
				BadRequestException.class,
				() -> userController.assingMembersUser(userPrincipal,userRequest));
		Assert.assertEquals("Member already assigned", thrown.getMessage());

	}
	@Test
	@WithMockUser(roles = {"LEADER"})
	public void unasisingMembrer() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
		UserRequest userRequest = progreaGitBuilder.userRequest();
		Boolean cond = (Boolean) userController.unassingMembersUser(userPrincipal,userRequest).getBody();
		assertThat(cond)
				.matches(m->m=true);
	}
	@Test
	@WithMockUser(roles = {"LEADER"})
	public void unasisingMembrerFail() throws Exception {
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUserLeader();
		UserRequest userRequest = progreaGitBuilder.userRequest();
		userRequest.setId(2L);
		Boolean cond = (Boolean) userController.unassingMembersUser(userPrincipal,userRequest).getBody();
		assertThat(cond)
				.matches(m->m=true);
	}


}
