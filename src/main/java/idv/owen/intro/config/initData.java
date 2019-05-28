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
            Resume resume = new Resume();
            resume.setName("郭政維");
            resume.setImg("test.jpg");
            resume.setListContents(Arrays.asList(
                    new ListContent("應徵項目", "Java程式設計師", resume),
                    new ListContent("英文姓名", "CHENG-WEI,KUO", resume),
                    new ListContent("出生日期", "1991年05月15日", resume),
                    new ListContent("現居住所", "新北市中和區中山路三段37巷34號17樓", resume),
                    new ListContent("電子郵件", "kuo05150515@gmail.com", resume),
                    new ListContent("聯絡電話", "0972-051-545", resume),
                    new ListContent("兵役狀況", "役畢(2014年11月)", resume),
                    new ListContent("婚姻狀況", "未婚", resume)
            ));
            resumeService.addOne(resume);
        }
    }
}
