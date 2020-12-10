import time

from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def about_us_page(self):
        self.client.get("/about-us", verify=False)
    
    @task
    def contact_us_page(self):
        self.client.get("/contact-us", verify=False)

    @task
    def channel_page(self):
        self.client.get("/channel/561728", verify=False)

    def on_start(self):
        self.client.get("/", verify=False)