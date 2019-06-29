package idv.owen.intro.site.controller.rest;

import com.fasterxml.jackson.databind.JsonNode;
import idv.owen.intro.site.model.ListContent;
import idv.owen.intro.site.model.Resume;
import idv.owen.intro.site.response.GeneralResponse;
import idv.owen.intro.site.service.ListContentService;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/listContent")
public class ListContentController {

    @Autowired
    ListContentService listContentService;

    @DeleteMapping(path = "/{id}")
    public JsonNode deleteById(@PathVariable(name = "id") Long id) {
        listContentService.deleteById(id);
        return GeneralResponse.successResponse("success", null);
    }

    @PostMapping(path = "/addOne/{resumeId}")
    public JsonNode addOne(@RequestBody ListContent listContent,
                           @PathVariable(name = "resumeId") Long resumeId) {
        Resume resume = new Resume();
        resume.setId(resumeId);
        listContent.setResume(resume);
        return GeneralResponse.successResponse("success", listContentService.addOne(listContent));
    }
}
