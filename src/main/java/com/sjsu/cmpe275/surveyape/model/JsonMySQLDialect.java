package com.sjsu.cmpe275.surveyape.model;


import org.hibernate.dialect.MySQL57Dialect;

import java.sql.Types;

public class JsonMySQLDialect extends MySQL57Dialect {

    public JsonMySQLDialect() {
        this.registerColumnType(Types.VARCHAR, "json");
    }

}
