package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.payload.UserRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
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

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class ProgreaGitApplicationTests {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	@WithMockUser(roles={"LEADER","ADMIN"})
	public void getListUser() throws Exception {
		mvc.perform(MockMvcRequestBuilders
				.get("/user/")
				.accept(MediaType.APPLICATION_JSON))
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@WithMockUser(roles={"USER","ADMIN", "LEADER"})
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
	public void updateUser() throws Exception {
		UserRequest userRequest = null;
		mvc.perform(MockMvcRequestBuilders
				.put("/user/")
				.content(objectMapper.writeValueAsString(userRequest))
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}



}
