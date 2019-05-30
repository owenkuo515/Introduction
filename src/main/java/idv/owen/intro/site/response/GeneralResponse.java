package idv.owen.intro.site.response;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GeneralResponse {

    private static ObjectMapper objectMapper;

    @Autowired
    private ObjectMapper objectMapperAfterAutowired;

    @PostConstruct
    private void initStaticObjectMapper() {
        objectMapper = this.objectMapperAfterAutowired;
    }
    public static JsonNode successResponse(String msg, Object data) {
        ObjectNode response = objectMapper.createObjectNode();
        response.put("status", HttpStatus.OK.value());
        response.put("msg", msg);
        response.set("data", objectMapper.valueToTree(data));
        return response;
    }
}
