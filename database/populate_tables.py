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
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                query = f"""INSERT INTO `user` (`id`, `active`, `firstname`, `lastname`, `username`, `password`, `email`, `phone`, `createdAt`, `updatedAt`) 
                VALUES (0, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}', '{row[8]}','{row[9]}')"""
                #print(query)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from user")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table user.")
    

def insert_user_role(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                query = f"""INSERT INTO `user_role` (`id`, `active`, `user_id`, `role_id`) 
                VALUES (0, {row[1]}, {row[2]}, {row[3]})"""
                #print(query_role)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from user_role")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table user_role.")
    
def insert_property(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                query = f"""INSERT INTO `property` (`id`, `active`, `civicAddress`, `aptNumber`, `street`, `city`, `neighbourhood`, `province`, `postalCode`, `country`, `listingType`, `price`, `livingArea`, `propertyArea`, `numOfBedrooms`, `numOfBathrooms`, `numOfFloors`, `yearBuilt`, `listedDate`, `propertyType`) 
                VALUES (0, {row[1]}, '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}', '{row[6]}', '{row[7]}', '{row[8]}','{row[9]}', '{row[10]}', {row[11]}, {row[12]}, {row[13]}, {row[14]}, {row[15]}, {row[16]}, '{row[17]}', '{row[18]}', '{row[19]}')"""
                #print(query)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from property")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table property.")
    
def insert_property_amenity(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                query = f"""INSERT INTO `property_amenity` (`id`, `active`, `property_id`, `amenity_id`) 
                VALUES (0, {row[1]}, {row[2]}, {row[3]})"""
                #print(query)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from property_amenity")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table property_amenity.")

def insert_visits(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                #print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                query = f"""INSERT INTO `visit` (`id`, `property_id`, `client_id`, `broker_id`, `status`, `time`) 
                VALUES (0, {row[1]}, {row[2]}, {row[3]}, '{row[4]}', '{row[5]}')"""
                #print(query)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from visit")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table visit.")
    
def insert_listings(connection, cursor, filepath):
    
    path = pathlib.Path(filepath)
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                query = f"""INSERT INTO `listings` (`id`, `active`, `parent_id`, `property_id`, `title`, `description`) 
                VALUES (0, {row[1]}, {row[2]}, {row[3]}, '{row[5]}', '{row[6]}')"""
                #print(query)
                cursor.execute(query)
        connection.commit()
    
    cursor.execute("select COUNT(*) from listings")
    records = cursor.fetchone()
    print(f"Inserted {records} records into table listings.")


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="Database table populator", add_help=False)
    parser.add_argument('-h', '--host', help="ip address of mysql DB", default='127.0.0.1')
    parser.add_argument('-d', '--db', help="db name", default="lorem")
    parser.add_argument('-u', '--user', help="user", default='lorem')
    parser.add_argument('-p', '--password', help="password as a string", default='lorem3#(xruN')
    
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
            print("Populating table user...")
            insert_user(connection, cursor, "./user.csv")
            print("Populating table user_role...")
            insert_user_role(connection, cursor, "./user_role.csv")
            print("Populating table property...")
            insert_property(connection, cursor, "./property.csv")
            print("Populating table property_amenity...")
            insert_property_amenity(connection, cursor, "./property_amenity.csv")
            print("Populating table visit...")
            insert_visits(connection, cursor, "./visit.csv")
            print("Populating table listing...")
            insert_listings(connection, cursor, "./listings.csv")
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")