package StepDefinitions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import io.cucumber.java.en.And;

public class ControllerInputText {
	
WebDriver driver;
	
	public ControllerInputText (ShareClass shareClass){
		driver = shareClass.startBrowser();
	}
	
	@And("Input Text for name \"(.*)\" and fill \"(.*)\"$")
	public void click_by_name(String name, String fill) throws InterruptedException {
		
		
		driver.findElement(By.xpath("//*[@name='"+name+"']")).sendKeys(fill);
		
		 
		Thread.sleep(2000);
	}
	
	@And("Input Text with label \"(.*)\" and fill \"(.*)\"$")
	public void click_by_label(String label, String fill) throws InterruptedException {
		
		
		driver.findElement(By.xpath("//label[text()='"+label+"']//parent::div//input")).sendKeys(fill);
		
		
		 
		Thread.sleep(2000);
	}

}
