package idv.owen.intro.site.controller.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import idv.owen.intro.site.pojo.ImgCutPojo;
import idv.owen.intro.site.response.GeneralResponse;
import idv.owen.intro.site.util.IoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class UploadController {

    private IoUtil ioUtil;

    @Value("${upload.path.prefix}")
    private String prefix;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    public UploadController(IoUtil ioUtil){
        this.ioUtil = ioUtil;
    }

    @PostMapping(value = "/rest/upload", consumes = {"multipart/form-data"}, produces = "application/json;charset=UTF-8;")
    public JsonNode upload(@RequestPart(value = "file", required = true) MultipartFile file) throws IOException {
        ObjectNode uploadResult = ioUtil.upload(file);
        ObjectNode result = mapper.createObjectNode();
        result.put("imgSrc", this.prefix + uploadResult.get("data").asText());
        return GeneralResponse.successResponse("success", result);
    }

    @PostMapping(value = "/rest/imgCut", produces = "application/json;charset=UTF-8;")
    public ResponseEntity<ObjectNode> imgCut(@RequestBody ImgCutPojo imgCutPojo) throws IOException {
        String fileName = imgCutPojo.getFileName().replaceAll(this.prefix, "");
        imgCutPojo.setFileName(fileName);
        ObjectNode uploadResult = ioUtil.imgCutAndUpload(imgCutPojo);
        ObjectNode result = mapper.createObjectNode();
        result.put("imgSrc", this.prefix + uploadResult.get("data").asText());
        return ResponseEntity
                .ok()
                .body(result);
    }

    @GetMapping("${upload.path.mapping}")
    @ResponseBody
    public ResponseEntity<Resource> accessStorageFile(@PathVariable String filename) throws Exception {
        Resource file = ioUtil.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
