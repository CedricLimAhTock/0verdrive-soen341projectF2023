#!/usr/bin/python

# Dependencies
# python3-pip
# pip install mysql-connector-python
# chmod +x populate_tables.py
# modify DB connection settings

import mysql.connector
import csv
import pathlib
import argparse
from mysql.connector import Error

def insert_user(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                qry_insert_user = f"""INSERT INTO `user` (`id`, `active`, `firstname`, `lastname`, `username`, `password_hash`, `email`, `phone`, `created`, `modified`) 
                VALUES (0, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}', '{row[8]}','{row[9]}')"""
                #print(qry_insert_user)
                cursor.execute(qry_insert_user)
                connection.commit()
    
    cursor.execute("select COUNT(*) from user")
    records = cursor.fetchone()
    print(f"Inserted {records} users into table user.")
    

def insert_user_role(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                qry_insert_user_role = f"""INSERT INTO `user_role` (`id`, `active`, `user_id`, `role_id`) 
                VALUES (0, {row[1]}, {row[2]}, {row[3]})"""
                #print(qry_insert_user_role)
                cursor.execute(qry_insert_user_role)
                connection.commit()
    
    cursor.execute("select COUNT(*) from user")
    records = cursor.fetchone()
    print(f"Inserted {records} users into table user.")


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="Database table populator", add_help=False)
    parser.add_argument('-h', '--host', help="ip address of mysql DB", default='127.0.0.1')
    parser.add_argument('-d', '--db', help="db name", default="lorem")
    parser.add_argument('-u', '--user', help="user", default='root')
    parser.add_argument('-p', '--password', help="password as a string")
    
    args = parser.parse_args()
    
    
    try:
        connection = mysql.connector.connect(host=args.host,
                                            database=args.db,
                                            user=args.user,
                                            password=args.password)
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            insert_user(connection, cursor, "./user.csv")
            insert_user_role(connection, cursor, "./user_role.csv")
            
                        
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")