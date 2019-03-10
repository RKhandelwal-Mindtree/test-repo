public class SendEmailVFController {
	public String subject { get; set; }
	public String body { get; set; }
    public String emailAddress { get; set; } 

	// Create a constructor that populates the Account object
	public SendEmailVFController() {
		System.debug('emailAddress'+emailAddress);
	}

	public PageReference send() {
		// Define the email
		Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage(); 

    	//String addresses = 'riya.khandelwal@appirio.com';
		String[] toAddresses = new List<String>();
        toAddresses.add(emailAddress);

		// Sets the paramaters of the email
		email.setSubject( subject );
		email.setToAddresses( toAddresses );
		email.setPlainTextBody( body );
    
		// Sends the email
		Messaging.SendEmailResult [] r = 
			Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});   
		
		return null;
	}
}