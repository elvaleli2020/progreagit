package co.edu.ufps.progreagit.service;

import co.edu.ufps.progreagit.exception.NotContentException;
import io.fabric8.kubernetes.client.utils.URLUtils;
import org.kohsuke.github.GHHook;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.MediaType;

public class GitHubControl {

    private GitHub github;

    public void create(String token){
        try {
            github = new GitHubBuilder().withOAuthToken("ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54").build();
            if(github.isCredentialValid())
                System.out.println("Paso");
            else throw new NotContentException("Not init");
        }catch (Exception e){
            throw new NotContentException("You need additional data");
        }
    }

    public GHRepository getRepository(String path) throws IOException {
        return github.getRepository("elvaleli2016/prestashop");
    }

    public GHRepository createRepository(String name){
        try {
            return github.createRepository(name,"estoy realizando una prueba","https://github.com/elvaleli2016/prestashop",true);
        }catch (Exception e){
            return null;
        }
    }
    public void removeOldWebHooks(GHRepository repository, String webhookUrl) {
        List<GHHook> hooks;
        try {
            hooks = repository.getHooks();
        } catch (IOException e) {
            imprimir("Failed to find WebHooks for repository " + repository.getFullName() + " due to : " + e);
            return;
        }
        if (hooks != null) {
            for (GHHook hook : hooks) {
                Map<String, String> config = hook.getConfig();
                if (config != null) {
                    String url = config.get("url");
                    if (url != null && webhookUrl.equals(url)) {
                        imprimir("Removing WebHook " + hook.getName() + " with ID " + hook.getId() + " for " + repository.getFullName() + " on URL " + webhookUrl);
                        try {
                            hook.delete();
                        } catch (IOException e) {
                            imprimir("Failed to remove WebHook " + hook.getName() + " with ID " + hook.getId() + " for " + repository.getFullName() + " on URL " + webhookUrl + " due to: " + e);
                        }
                    }
                }
            }
        }
    }

    public void registerGitWebHook(String webhookUrl, String gitOwnerName, String gitRepoName) throws IOException {

        // TODO move this logic into the GitProvider!!!
        String body = "{\"name\": \"web\",\"active\": true,\"events\": [\"*\"],\"config\": {\"url\": \"" + webhookUrl + "\",\"insecure_ssl\":\"1\"," +
                "\"content_type\": \"json\"}}";

        String authHeader = "Beaber ca8bf119b6d4e24479485a6c3ed35bc5f25d2d54";
        String createWebHookUrl = URLUtils.pathJoin("https://api.github.com/repos/", gitOwnerName, gitRepoName, "/hooks");

        // JAX-RS doesn't work so lets use trusty java.net.URL instead ;)
        HttpURLConnection connection = null;
        try {
            URL url = new URL(createWebHookUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", MediaType.APPLICATION_JSON);
            connection.setRequestProperty("Content-Type", MediaType.APPLICATION_JSON);
            connection.setRequestProperty("Authorization", authHeader);
            connection.setDoOutput(true);

            OutputStreamWriter out = new OutputStreamWriter(
                    connection.getOutputStream());
            out.write(body);

            out.close();
            int status = connection.getResponseCode();
            String message = connection.getResponseMessage();
            imprimir("Got response code from github " + createWebHookUrl + " status: " + status + " message: " + message);
            if (status < 200 || status >= 300) {
                imprimir("Failed to create the github web hook at: " + createWebHookUrl + ". Status: " + status + " message: " + message);
                throw new IllegalStateException("Failed to create the github web hook at: " + createWebHookUrl + ". Status: " + status + " message: " + message);
            }
        } catch (Exception e) {
            imprimir("Failed to create the github web hook at: " + createWebHookUrl + ". " + e);
            throw e;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private void imprimir(String mens){
        System.out.println(mens);
    }


}
