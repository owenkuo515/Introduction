package idv.owen.intro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by Owen
 * on 2018/4/30.
 */
//@ComponentScan(basePackages = {"team.practice.englishtypingtest.site.controller","team.practice.englishtypingtest.site.service"})
//@EnableAutoConfiguration
@SpringBootApplication
@PropertySource({"classpath:intro.properties"})
public class SpringBootMain {
    public static void main(String[] args) throws Exception {
        System.out.println("test123");
        SpringApplication.run(SpringBootMain.class, args);
    }

}
