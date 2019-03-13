package com.factly.dega.client;

import com.factly.dega.security.oauth2.AuthorizationHeaderUtil;
import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

public class OAuth2InterceptedFeignConfiguration {

    @Bean(name = "oauth2RequestInterceptor")
    public RequestInterceptor getOAuth2RequestInterceptor(AuthorizationHeaderUtil authorizationHeaderUtil) throws IOException {
        return new TokenRelayRequestInterceptor(authorizationHeaderUtil);
    }
}
