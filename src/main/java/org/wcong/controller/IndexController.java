package org.wcong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wcong on 2016/7/19.
 */
@Controller
public class IndexController {

    @RequestMapping
    public String index() {
        return "index";
    }

}
