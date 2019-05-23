package idv.owen.intro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Owen
 * on 2018/4/30.
 */
//@ComponentScan(basePackages = {"team.practice.englishtypingtest.site.controller","team.practice.englishtypingtest.site.service"})
//@EnableAutoConfiguration
@SpringBootApplication
public class SpringBootMain {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(SpringBootMain.class, args);
    }

}
