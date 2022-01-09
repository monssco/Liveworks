 ✅  ComputeStackstaging

Outputs:
ComputeStackstaging.DownloadKeyCommand = aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem
ComputeStackstaging.IPAddress = 52.23.248.176
ComputeStackstaging.KeyName = cdk-keypair
ComputeStackstaging.sshcommand = ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@52.23.248.176