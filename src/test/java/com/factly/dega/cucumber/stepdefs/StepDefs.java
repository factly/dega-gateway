package com.factly.dega.cucumber.stepdefs;

import com.factly.dega.GatewayApp;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = GatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
