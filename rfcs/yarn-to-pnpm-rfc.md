# RFC: Migration from Yarn to pnpm in the Mono Repo

## Approval Status

- [x] Approved
- [ ] Rejected

## Background

The mono repo currently uses Yarn as the default package manager for managing dependencies across projects. While Yarn has served us well, we believe that migrating to pnpm could offer several advantages, including improved disk space usage and faster installations.

## Proposal

The proposal is to migrate the mono repo from Yarn to pnpm as the preferred package manager. This change involves updating the project's documentation, modifying the development workflow, and ensuring compatibility with pnpm.

## Goals

1. **Improve Efficiency**: Reduce disk space usage and improve installation times with pnpm's unique approach to dependency management.
2. **Maintain Consistency**: Ensure consistent dependency resolution and compatibility across different environments and installations.
3. **Streamline Workflow**: Simplify the development workflow by standardizing on a single package manager.

## Benefits of pnpm

- **Reduced Disk Space Usage**: pnpm's approach to package management reduces duplication of packages, leading to smaller disk space requirements.
- **Faster Installations**: By utilizing hard links or symbolic links and caching, pnpm can install dependencies more quickly compared to Yarn.
- **Deterministic Installations**: Similar to Yarn, pnpm uses a lock file (`pnpm-lock.yaml`) to ensure deterministic installations.

## Considerations

1. **Migration Effort**: Migrating from Yarn to pnpm will require updating project configurations, scripts, and documentation. It's essential to allocate sufficient time and resources for this transition.
2. **Compatibility**: Ensure that all projects within the mono repo are compatible with pnpm and that any custom tooling or scripts accommodate the change in package manager.
3. **Community Support**: While pnpm has a growing community and active development, it's essential to consider ongoing support and maintenance.

## Next Steps

1. **Evaluation**: Evaluate the feasibility and potential impact of migrating to pnpm.
2. **Testing**: Conduct thorough testing to ensure compatibility and stability with pnpm across all projects within the mono repo.
3. **Documentation**: Update project documentation, including installation instructions and development guidelines, to reflect the switch to pnpm. [pnpm website](https://pnpm.io/)
4. **Communication**: Communicate the migration plan to team members and stakeholders, gather feedback, and address any concerns or questions.

## Conclusion

Migrating the mono repo from Yarn to pnpm represents an opportunity to improve efficiency, maintain consistency, and streamline the development workflow. By carefully evaluating the benefits and considerations outlined above and following a well-defined migration plan, we can ensure a smooth transition to pnpm while maximizing the benefits for the project and its contributors.
