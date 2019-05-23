package idv.owen.intro.site.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by RayChen on 2019/5/14.
 */

@Controller
public class ViewController {
    @GetMapping(value = {"/", "/home"})
    public String home() {
        return "home";
    }
}
