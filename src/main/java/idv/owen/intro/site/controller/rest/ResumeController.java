package idv.owen.intro.site.controller.rest;

import com.fasterxml.jackson.databind.JsonNode;
import idv.owen.intro.site.model.Resume;
import idv.owen.intro.site.response.GeneralResponse;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/resume")
public class ResumeController {

    @Autowired
    ResumeService resumeService;

    @Value("${upload.path.prefix}")
    private String prefix;

    @GetMapping(path = "/")
    public JsonNode findOne() {
        Resume resume = resumeService.findById();
        resume.setImg(this.prefix + resume.getImg());
        return GeneralResponse.successResponse("success", resume);
    }

    @GetMapping("/reset")
    public JsonNode accessStorageFile() throws Exception {
        Resume resume = resumeService.reset();
        resume.setImg(this.prefix + resume.getImg());
        return GeneralResponse.successResponse("success", resume);
    }
}
