package idv.owen.intro.site.controller.rest;

import com.fasterxml.jackson.databind.JsonNode;
import idv.owen.intro.site.response.GeneralResponse;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/resume")
public class ResumeController {

    @Autowired
    ResumeService resumeService;

    @GetMapping(path = "/")
    public JsonNode findOne() {
        return GeneralResponse.successResponse("success", resumeService.findById());
    }
}
