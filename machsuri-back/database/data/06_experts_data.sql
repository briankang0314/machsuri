insert into
  experts (user_id, name, address_id, detail_address_id)
values
  (1, '이온온', 1, 2);

insert into
  experts (
    user_id,
    address_id,
    detail_address_id,
    name,
    master_image,
    intro,
    start_time,
    end_time,
    work_experience,
    employee_number
  )
values
  (
    2,
    2,
    1,
    '최온온',
    "/images/profile/profile_sample.jpeg",
    "안녕하세요",
    '2024-01-01 09:00',
    '2024-01-01 18:00',
    5,
    10
  );