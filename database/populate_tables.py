#!/usr/bin/python

# Dependencies
# python3-pip
# pip install mysql-connector-python
# chmod +x populate_tables.py
# modify DB connection settings

import mysql.connector
import csv
import pathlib
from mysql.connector import Error

def insert_user(connection, cursor):
    
    path = pathlib.Path("./user.csv")
    with open('user.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                qry_insert_user = f"""INSERT INTO user (id, active, firstname, lastname, username, password_hash, email, phone, created, modified) 
                VALUES ({row[0]}, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}', '{row[8]}','{row[9]}')"""
                #print(qry_insert_user)
                cursor.execute(qry_insert_user)
                connection.commit()
    
    cursor.execute("select COUNT(*) from user")
    records = cursor.fetchone()
    print(f"Inserted {records} users into table user.")
    

if __name__ == "__main__":
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='lorem',
                                            user='root',
                                            password='')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            insert_user(connection, cursor)
                        
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")