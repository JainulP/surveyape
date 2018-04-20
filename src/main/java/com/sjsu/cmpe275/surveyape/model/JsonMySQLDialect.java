package com.sjsu.cmpe275.surveyape.model;

import org.hibernate.dialect.MySQLDialect;

import java.sql.Types;

public class JsonMySQLDialect extends MySQLDialect {

    public JsonMySQLDialect() {
        this.registerColumnType(Types.VARCHAR, "json");
    }

}
