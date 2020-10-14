package co.edu.ufps.progreagit;

import co.edu.ufps.progreagit.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ProgreaGitApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProgreaGitApplication.class, args);
	}
}
