package idv.owen.intro.site.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import idv.owen.intro.site.pojo.ImgCutPojo;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class IoUtil {
    @Autowired
    Environment environment;
    @Autowired
    ObjectMapper mapper;

    private String uploadPathPosition;
    private String uploadPrefix;

    @PostConstruct
    public void init() throws IOException {
        this.uploadPathPosition = environment.getProperty("upload.path.position");
        this.uploadPrefix = environment.getProperty("upload.path.prefix");
        File uploadDir = new File(this.uploadPathPosition);
        if (!uploadDir.isDirectory()) {
            uploadDir.mkdir();
        }
    }

    public ObjectNode upload(MultipartFile file) throws IOException {
        ObjectNode objectNode = mapper.createObjectNode();
        String uuid = UUID.randomUUID().toString();
        String originalFilename = file.getOriginalFilename();
        String fileExtension = FilenameUtils.getExtension(originalFilename);
        String fileName = uuid + "." + fileExtension;
        Path toPath = Paths.get(uploadPathPosition + fileName);
        Files.copy(file.getInputStream(), toPath);
        objectNode.put("data", fileName);
        return objectNode;
    }
    public ObjectNode imgCutAndUpload(ImgCutPojo imgCutPojo) throws IOException {
        String fileName = imgCutPojo.getFileName();
        int x = imgCutPojo.getX1();
        int y = imgCutPojo.getY1();
        int width = imgCutPojo.getWidth();
        int height = imgCutPojo.getHeight();

        ObjectNode objectNode = mapper.createObjectNode();
        String uuid = UUID.randomUUID().toString();
        String fileExtension = FilenameUtils.getExtension(fileName);
        String newFileName = uuid + "." + fileExtension;

        File imageFile = new File(uploadPathPosition + fileName);
        BufferedImage bufferedImage = ImageIO.read(imageFile);
        BufferedImage croppedImage = bufferedImage.getSubimage(x, y, width, height);
        File pathFile = new File(uploadPathPosition + newFileName);
        ImageIO.write(croppedImage, fileExtension, pathFile);
        objectNode.put("data", newFileName);
        return objectNode;
    }
    public Resource loadAsResource(String filename) throws Exception {
        try {
            Path file = Paths.get(uploadPathPosition + filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new Exception("storage.file.notFound.exception");
            }
        } catch (Exception e) {
            throw new Exception("storage.file.notFound.exception");
        }
    }
}
