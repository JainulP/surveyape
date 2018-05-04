package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,String> {
}
