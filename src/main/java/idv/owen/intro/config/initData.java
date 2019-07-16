package idv.owen.intro.config;

import idv.owen.intro.site.model.ListContent;
import idv.owen.intro.site.model.Resume;
import idv.owen.intro.site.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Created by Owen
 * on 2019/1/14.
 */
@Component
public class initData {

    @Autowired
    private Environment environment;

    @Autowired
    private ResumeService resumeService;

    @Bean(initMethod = "init")
    public void init() {
        Boolean isCreate = environment.getProperty("spring.jpa.hibernate.ddl-auto").equals("create");
        if (isCreate) {
            resumeService.reset();
        }
    }
}
