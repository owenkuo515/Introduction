package idv.owen.intro.site.controller.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import idv.owen.intro.site.response.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/rest/pdf")
public class GeneratePdfController {
    @Autowired
    ObjectMapper mapper;

    @PostMapping(path = "/", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public JsonNode generatePdf(@RequestBody String data) throws IOException {
        final String uri = "http://localhost:9090/pdf/generatePdfByHtml";
        JsonNode jsonData = mapper.readTree(data);
        RestTemplate restTemplate = new RestTemplate();
        JsonNode generatePdfResult = restTemplate.postForObject(uri, jsonData, JsonNode.class);
        ObjectNode result = mapper.createObjectNode();
        result.put("fileName",generatePdfResult.get("data").asText());
        return GeneralResponse.successResponse("success", result);
    }
}
