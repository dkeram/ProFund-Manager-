from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
import time


class AutoLogin_PSKE:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):
        options = Options()
        options.use_chromium = True
        driver = webdriver.Edge(executable_path="C:/msedgedriver.exe", options=options)
        driver.get("https://www.ependyseis.gr/mis/(S(mwybhvy05ifwao5beplf4xl0))/System/Login.aspx?ReturnUrl=%2fmis%2f")
        username_input_box=driver.find_element(By.NAME,"LoginControl1$txtLoginName")
        password_input_box=driver.find_element(By.NAME,"LoginControl1$txtPassword")
        login_btn=driver.find_element(By.NAME,"LoginControl1$btnLogin")
        username_input_box.send_keys(self.username)
        time.sleep(1)
        password_input_box.send_keys(self.password)
        time.sleep(1)
        login_btn.click()
        
        
class AutoLogin_EFKA:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):
        options = Options()
        options.use_chromium = True
        driver = webdriver.Edge(executable_path="C:/msedgedriver.exe", options=options)
        driver.get("https://apps.e-efka.gov.gr/eAccess/login.xhtml")
        username_input_box=driver.find_element(By.NAME,"j_username")
        password_input_box=driver.find_element(By.NAME,"j_password")
        login_btn=driver.find_element(By.NAME,"j_idt32")
        username_input_box.send_keys(self.username)
        time.sleep(1)
        password_input_box.send_keys(self.password)
        time.sleep(1)
        login_btn.click()
        

class AutoLogin_DYPA_AADE:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):
        options = Options()
        options.use_chromium = True
        driver = webdriver.Edge(executable_path="C:/msedgedriver.exe", options=options)
        driver.get("https://oauth2.gsis.gr/oauth2server/login.jsp")
        username_input_box=driver.find_element(By.NAME,"j_username")
        password_input_box=driver.find_element(By.NAME,"j_password")
        login_btn=driver.find_element(By.ID,"btn-login-submit")
        username_input_box.send_keys(self.username)
        time.sleep(1)
        password_input_box.send_keys(self.password)
        time.sleep(1)
        login_btn.click()
        

class AutoLogin_MY_AADE:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def login(self):
        options = Options()
        options.use_chromium = True
        driver = webdriver.Edge(executable_path="C:/msedgedriver.exe", options=options)
        driver.get("https://login.gsis.gr/mylogin/login.jsp?bmctx=1DB55AB50C08F2B418903DE4EB7466AD47038BC455E39B9EA82B1EB28CE52BC6&contextType=external&username=string&password=secure_string&challenge_url=https%3A%2F%2Flogin.gsis.gr%2Fmylogin%2Flogin.jsp&ssoCookie=disablehttponly&request_id=-2792430152783083688&authn_try_count=0&locale=en_US&resource_url=https%253A%252F%252Fwww1.gsis.gr%252Ftaxisnet%252Fmytaxisnet")
        username_input_box=driver.find_element(By.NAME,"username")
        password_input_box=driver.find_element(By.NAME,"password")
        login_btn=driver.find_element(By.NAME,"btn_login")
        username_input_box.send_keys(self.username)
        time.sleep(1)
        password_input_box.send_keys(self.password)
        time.sleep(1)
        login_btn.click()