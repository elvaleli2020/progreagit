package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.controller.UserController;
import co.edu.ufps.progreagit.model.User;
import co.edu.ufps.progreagit.payload.ApiResponse;
import co.edu.ufps.progreagit.payload.SearchUser;
import co.edu.ufps.progreagit.payload.UserRequest;
import co.edu.ufps.progreagit.security.UserPrincipal;
import com.fasterxml.jackson.databind.ObjectMapper;
import dataBuilder.ProgreaGitBuilder;
import org.junit.Before;
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

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
	@WithMockUser(roles={"USER","ADMIN", "LEADER"})
	@DisplayName(value = "getAccountUser -> The admin and leader user can access to visualize a specific user.")
	public void getAccountUser() throws Exception {
		mvc.perform(MockMvcRequestBuilders
				.get("/user/{id}", 1)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.idUser").value(1));
	}

	@Test
	@WithMockUser(roles={"USER"})
	@DisplayName(value = "updateUser -> The user as soon as he accesses the authenticator if he is missing data")
	public void updateUser() throws Exception {
		UserRequest userRequest = progreaGitBuilder.userRequest();
		UserPrincipal userPrincipal= progreaGitBuilder.userPrincipalUser();
		ApiResponse apiResponse= (ApiResponse) userController.updateUser(userRequest, userPrincipal).getBody();
		assertThat(apiResponse)
				.matches(m->m.getMessage().equals("User registered successfully"));;
	}

	@Test
	@WithMockUser(roles={"ADMIN", "LEADER"})
	@DisplayName(value = "searchUser -> List of users filtered by code, email, name, if they have a leader request or not")
	public void searchUser() throws Exception {
		// Search by code
		SearchUser searchUser = progreaGitBuilder.searchUserCode();
		mvc.perform(MockMvcRequestBuilders
				.post("/user/search")
				.content(objectMapper.writeValueAsString(searchUser))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());

		// Search by parts of the email
		searchUser = progreaGitBuilder.searchUserEmail();
		mvc.perform(MockMvcRequestBuilders
				.post("/user/search")
				.content(objectMapper.writeValueAsString(searchUser))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());

		// Search by parts of the name
		searchUser = progreaGitBuilder.searchUserName();
		mvc.perform(MockMvcRequestBuilders
				.post("/user/search")
				.content(objectMapper.writeValueAsString(searchUser))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles={"ADMIN"})
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

}
